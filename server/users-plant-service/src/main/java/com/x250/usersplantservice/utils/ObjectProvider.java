package com.x250.usersplantservice.utils;

import com.x250.usersplantservice.exception.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public class ObjectProvider {

    public static <T, V, W extends JpaRepository<T, V>> T getObjectFromDB(V objectId, W repository)
            throws EntityNotFoundException {
        return repository.findById(objectId)
                .orElseThrow(() -> new EntityNotFoundException("Object: " + objectId + " does not exist in database"));
    }
}
