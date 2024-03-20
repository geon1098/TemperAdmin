package com.folder.app.service;

import com.folder.app.entity.Ondo;
import com.folder.app.repository.OndoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OndoService {

    private final OndoRepository ondoRepository;

    @Autowired
    public OndoService(OndoRepository ondoRepository) {
        this.ondoRepository = ondoRepository;
    }

    // 온도 정보 생성
    public void addOndo(Ondo ondo) {
        // ID 설정 로직을 수행
        ondo.setIdForDateAndTime();

        // 데이터베이스에 저장
        ondoRepository.save(ondo);
    }
    public Ondo getOndoById(Long id) {
        return ondoRepository.findById(id).orElse(null);
    }

    // 모든 온도 정보 반환
    public List<Ondo> getAllOndos() {
        return ondoRepository.findAll();
    }

    // 온도 정보 갱신
    public Ondo updateOndo(Ondo ondo) {
        return ondoRepository.save(ondo);
    }

    public Ondo addOndoWithIdForDateAndTime(Ondo ondo) {
        ondo.setIdForDateAndTime(); // ID 설정 호출 추가

        System.out.println("잘됨");
        return ondoRepository.save(ondo);
    }
}
