package com.braude.ProConnect.controllers;

import com.braude.ProConnect.models.entities.Profession;
import com.braude.ProConnect.services.ProfessionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("professions")
@CrossOrigin()
@Validated
@Tag(name = "Professions")
public class ProfessionController {
    private final ProfessionService professionService;

    @Autowired
    public ProfessionController(ProfessionService professionService) {
        this.professionService = professionService;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Profession> createService(String name, String description,String svg) {
        Profession profession = professionService.addProfessions(name, description,svg);
        return new ResponseEntity<>(profession, HttpStatus.OK);

    }

    @GetMapping(value = "/get")
    public ResponseEntity<List<Profession>> getProfession(){
        List<Profession> profession = professionService.findAll();
        if(profession != null)
            return new ResponseEntity<>(profession, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
