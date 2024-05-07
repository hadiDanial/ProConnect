package com.braude.ProConnect.services;

import com.braude.ProConnect.exceptions.ProConnectException;
import com.braude.ProConnect.models.embeddables.Name;
import com.braude.ProConnect.models.entities.*;
import com.braude.ProConnect.models.enums.AccountStatus;
import com.braude.ProConnect.models.enums.WorkAreas;
import com.braude.ProConnect.repositories.RoleRepository;
import com.braude.ProConnect.repositories.UserProfessionsRepository;
import com.braude.ProConnect.repositories.SearchesRepository;
import com.braude.ProConnect.repositories.UserRepository;
import com.braude.ProConnect.requests.*;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserProfessionsRepository userProfessionsRepository;
    private final RoleRepository roleRepository;
    private final ProfessionService professionService;
    private final AuthenticationService authenticationService;
    private final ReviewService reviewService;

    private final SearchesRepository searchesRepository;

    @Autowired
    public UserService(UserRepository userRepository, UserProfessionsRepository userProfessionsRepository, RoleRepository roleRepository, 
                       AuthenticationService authenticationService, ProfessionService professionService, SearchesRepository searchesRepository, ReviewService reviewService) {
        this.userRepository = userRepository;
        this.userProfessionsRepository = userProfessionsRepository;
        this.roleRepository = roleRepository;
        this.authenticationService = authenticationService;
        this.professionService = professionService;
        this.reviewService = reviewService;
        this.searchesRepository = searchesRepository;
    }

    public User createUser(User user){
        if(!userRepository.existsById(user.getId())){
            user.setAccountStatus(AccountStatus.SETUP);
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Returns the User with the given userId if found, otherwise returns null.
     * @param userId User id to search for.
     * @return {@link User} with the given userId, or null if not found.
     */
    public User getUser(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElse(null);
        if(user == null) return null;
        setUserRatings(user);
        return user;
    }
    public List<User> getAllUsers(){
        List<User> users = userRepository.findAll();
        for (User user : users) {
            setUserRatings(user);
        }
        return users;
    }

    private void setUserRatings(User user) {
        Float averageRatingByReviewedUser = reviewService.getAverageRatingByReviewedUser(user);
        Integer countRatingByReviewedUser = reviewService.getCountRatingByReviewedUser(user);
        if(averageRatingByReviewedUser == null)
            averageRatingByReviewedUser = 0f;
        if(countRatingByReviewedUser == null)
            countRatingByReviewedUser = 0;
        user.setAverageRating(averageRatingByReviewedUser);
        user.setRatingsCount(countRatingByReviewedUser);
    }

    public boolean exists(String userId){
        return userRepository.existsById(userId);
    }

    public boolean addRole(String userId, long roleId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty())
            throw new ProConnectException("User not found.");
        Optional<Role> role = roleRepository.findById(roleId);
        if(role.isEmpty())
            throw new ProConnectException("Role not found.");
        User user = optionalUser.get();
        if(!user.addRole(role.get()))
            throw new ProConnectException("User already has this role.");
        userRepository.save(user);
        return true;
    }

    public List<User> createUsers(List<User> users) {
        List<User> newUsers = new ArrayList<>();
        for (User user : users) {
            newUsers.add(createUser(user));
        }
        return newUsers;
    }

    public User updatePersonalInfo(UpdatePersonalInfoRequest request){
        User user = authenticationService.getAuthorizedUser();
        if(user == null)
            throw new ProConnectException("User not found.");
        Name name = request.getName();
        name.toUpperCase();
        user.setName(name);
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoles(request.getRoles());
        user.setAccountStatus(AccountStatus.ACTIVE);
        user.setPhotoUrl(request.getPhotoUrl());
        WorkAreas workAreas = request.getWorkAreas();
        if(workAreas == null) workAreas = WorkAreas.North;
        user.setWorkAreas(workAreas);
        user = userRepository.save(user);
        return user;
    }
    public User updateProfessions(UpdateProfessionsRequest request){
        User user = authenticationService.getAuthorizedUser();
        if(user.getUserProfessions() != null) {
            user.getUserProfessions().clear();
        } else {
            user.setUserProfessions(new ArrayList<>());
        }
        UserProfession[] professions = request.getProfessions();
        if(professions != null) {
            for (UserProfession userProfessionToAdd : professions) {
                Profession profession = professionService.getProfessionById(userProfessionToAdd.getProfession().getId());
                if (profession == null)
                    throw new ProConnectException("Profession not found.");
                user.getUserProfessions().add(new UserProfession(user, profession, userProfessionToAdd.getStartDate(), userProfessionToAdd.getEndDate(), userProfessionToAdd.getServices()));

            }
        }

        user = userRepository.save(user);
        return user;
    }

    public User updateProfile(UpdateProfileRequest updateProfileRequest) {
        updatePersonalInfo(updateProfileRequest.getUpdatePersonalInfoRequest());
        return updateProfessions(updateProfileRequest.getUpdateProfessionsRequest());
    }

    public int getAllUsersNumber() {
        return userRepository.findAll().size();
    }

    public List<UserProfession> getUserProfessions() {
        return userProfessionsRepository.findAllByUser(authenticationService.getAuthorizedUser());
    }

    public List<UserProfession> getUserProfessions(String userId) {
        return userProfessionsRepository.findAllByUser(userRepository.findById(userId).get());
    }

    public void rateUser(String userId, int rating) {
        User user = userRepository.findById(userId).get();
        user.addRating(rating);
        userRepository.save(user);
    }

    public List<User> findByWorkAreas(WorkAreas workAreas) {
        return userRepository.findByWorkAreas(workAreas);
    }



    public List<User> findUserByProfession(String professionName, WorkAreas workAreas) {
        Profession profession = professionService.getProfessionByName(professionName);
        List<UserProfession> userProfessions = userProfessionsRepository.findAllByProfession(profession);
        List<User> users = userProfessions.stream().map(UserProfession::getUser).toList()
                .stream().filter(user -> {
                    WorkAreas userWorkAreas = user.getWorkAreas();
                    if(workAreas == null || userWorkAreas == null) return false;
                    return userWorkAreas.equals(workAreas);
                }).toList();

        Searches searches = searchesRepository.findAll().get(0);
        searches.setSearches(searches.getSearches()+1);
        searchesRepository.save(searches);
        List<User> dtos = new ArrayList<>();
        for (User user : users) {
            try {
                dtos.add((User) user.clone());
            } catch (CloneNotSupportedException e) {
                throw new RuntimeException(e);
            }
        }
        return dtos;
//        return userRepository.findByProfessionAndWorkAreas(profession, workAreas);

    }

    public List<User> getUsersByEmails(String[] emails) {

        List<User> users = new ArrayList<>();

        for (String email : emails) {

            users.add(userRepository.findByEmail(email));
        }

        return users;
    }

    public void addRating(String userId, int rating) {
        User reviewer = authenticationService.getAuthorizedUser();
        User reviewedUser = userRepository.findById(userId).get();
        rate(userId, rating, reviewer, reviewedUser);
    }

    private void rate(String userId, int rating, User reviewer, User reviewedUser) {
        rating = Math.min(5, Math.max(1, rating));
        if(reviewedUser.getId().equals(reviewer.getId()))
            throw new ProConnectException("Can't rate yourself.");
        Review review;
        if(reviewer.getReviewsGiven().stream().anyMatch(givenReview -> givenReview.getReviewedUser().getId().equals(userId))) {
            System.out.println("You already rated this user.");
            review = reviewer.getReviewsGiven().stream().filter(givenReview -> givenReview.getReviewedUser().getId().equals(userId)).findFirst().get();
            reviewedUser.removeRating(review.getScore());
            review.setScore(rating);
            reviewedUser.addRating(rating);
        }
        else{
            review = Review.builder().reviewer(reviewer).reviewedUser(reviewedUser)
                    .roleReviewed(reviewedUser.getRoles().get(0)).reviewText("Sample review text because I don't want to delete the database")
                    .score(rating).timestamp(ZonedDateTime.now()).build();
            reviewedUser.addRating(rating);
        }
        reviewedUser.getReviewsReceived().add(review);
        reviewer.getReviewsGiven().add(review);
        reviewService.createReview(review);
        userRepository.save(reviewedUser);
        userRepository.save(reviewer);
    }

    public List<String> getAllUserIds() {
        List<User> users = userRepository.findAll();
        List<String> userIds = new ArrayList<>();
        for (User user : users) {
            userIds.add(user.getId());
        }
        return userIds;
    }

    public void addRatingsBulk(List<CreateRatingsBulkRequest> ratings) {
        for (CreateRatingsBulkRequest rating : ratings) {
            User reviewer = userRepository.findById(rating.getReviewerId()).get();
            User reviewedUser = userRepository.findById(rating.getReviewedId()).get();
            rate(rating.getReviewerId(), rating.getRating(), reviewer, reviewedUser);
        }
    }

    public void createBulkHomeowners(List<CreateBulkHomeownersRequest> requests) {
        Role role = roleRepository.findById(2L).get();
        List<User> users = new ArrayList<>();
        for (CreateBulkHomeownersRequest request : requests) {
             User user = User.builder().id(UUID.randomUUID().toString()).email(request.getEmail())
                     .name(new Name(request.getFirstName(), request.getLastName()))
                     .accountStatus(AccountStatus.ACTIVE)
                     .phoneNumber(request.getPhoneNumber()).roles(Arrays.asList(role)).build();
             users.add(user);
        }
        createUsers(users);
    }

    public void createBulkProfessionals(List<CreateBulkProfessionalsRequest> requests) {
        Role role = roleRepository.findById(3L).get();
        List<User> users = new ArrayList<>();
        for (CreateBulkProfessionalsRequest request : requests) {
            User user = User.builder().id(UUID.randomUUID().toString()).email(request.getEmail())
                    .name(new Name(request.getFirstName(), request.getLastName()))
                    .accountStatus(AccountStatus.ACTIVE)
                    .phoneNumber(request.getPhoneNumber()).roles(Arrays.asList(role)).build();
            Profession profession = professionService.getProfessionById(request.getProfessionId());
            UserProfession userProfession = new UserProfession();
            userProfession.setServices(request.getServices());
            userProfession.setUser(user);
            userProfession.setStartDate(request.getStartDate());
            userProfession.setProfession(profession);
            if (profession == null)
                throw new ProConnectException("Profession not found.");
            user.getUserProfessions().add(userProfession);
            users.add(user);
        }
        createUsers(users);
    }
}