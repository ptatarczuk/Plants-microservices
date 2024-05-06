package com.x250.plantservice.repository;

import com.x250.plantservice.model.Plant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class PlantRepositoryTest {

    @Autowired
    private PlantRepository underTest;

    @Test
    void itShouldFindThreePlantsIfSearchPhraseEqualsPlant() {
        // given
        // when
        List<Plant> expected = underTest.findByNameContainsIgnoreCase("pLant");

        // then
        assertEquals(3, expected.size());
    }

    @Test
    void itShouldNotFindAnyPlantsIfSearchPhraseEqualsTest() {
        // given
        // when
        List<Plant> expected = underTest.findByNameContainsIgnoreCase("test");

        // then
        assertEquals(0, expected.size());
    }
}
