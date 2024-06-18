package site.toeicdoit.api.common.service;

import site.toeicdoit.api.common.component.MessengerVo;

public interface CommandService<T> {
    MessengerVo save(T t);
    MessengerVo deleteById(Long id);
    MessengerVo modify(T t);
}
