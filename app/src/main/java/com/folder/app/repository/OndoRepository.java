package com.folder.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.folder.app.entity.Ondo;

@Repository
public interface OndoRepository extends JpaRepository<Ondo, Long> {

}