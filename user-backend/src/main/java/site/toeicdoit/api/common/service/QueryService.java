package site.toeicdoit.api.common.service;

import site.toeicdoit.api.common.component.MessengerVo;

import java.util.List;
import java.util.Optional;

public interface QueryService <T>{
    List<T> findAll();
    Optional<T> findById(Long id);
    MessengerVo count();
    Boolean existsById(Long id);
}
