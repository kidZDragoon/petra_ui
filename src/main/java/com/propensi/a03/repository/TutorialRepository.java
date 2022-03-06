package com.propensi.a03.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.propensi.a03.model.Tutorial;

public interface TutorialRepository extends JpaRepository<Tutorial, Long> {
    List<Tutorial> findByPublished(boolean published);
    List<Tutorial> findByTitleContaining(String title);
}