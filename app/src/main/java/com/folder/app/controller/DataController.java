package com.folder.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.folder.app.entity.Ondo;
import com.folder.app.service.OndoService;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class DataController {

  @Autowired
  private OndoService ondoService;

  @GetMapping("/items")
  public List<Ondo> getOndo() {
    List<Ondo> ondos = ondoService.getAllOndos();
    System.out.println("Retrieved Ondo data: " + ondos);
    return ondos;
  }

  @PostMapping("/saveTemperature")
  public Ondo addOndo(@RequestBody Ondo requestOndo) {
    Ondo ondo = new Ondo();
    ondo.setTemperature09(requestOndo.getTemperature09());
    ondo.setTemperature13(requestOndo.getTemperature13());
    ondo.setTemperature17(requestOndo.getTemperature17());
    ondo.setChecker(requestOndo.getChecker());

    ondoService.addOndoWithIdForDateAndTime(ondo);

    return ondo;
  }

  @PutMapping("/update")
  public Ondo updateOndo(@RequestBody Ondo ondo) {
    return ondoService.updateOndo(ondo);
  }

  @PostMapping("/extract-text")
  public String extractText(@RequestParam("imageData") MultipartFile imageData) {
    // 여기에 Tesseract.js를 사용하여 텍스트 추출 로직을 추가
    // 추출된 텍스트를 데이터베이스에 저장
    Ondo ondo = new Ondo();
    ondo.setChecker("Extracted Text");
    ondo.setTemperature09(0.0f); // 예시로 값을 설정
    ondo.setTemperature13(0.0f);
    ondo.setTemperature17(0.0f);

    ondoService.addOndoWithIdForDateAndTime(ondo);

    // 예시로 업로드된 파일의 이름을 반환
    return "Extracted text from file: " + imageData.getOriginalFilename();
  }
}