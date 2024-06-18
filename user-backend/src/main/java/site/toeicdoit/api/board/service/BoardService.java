package site.toeicdoit.api.board.service;

import site.toeicdoit.api.board.model.BoardModel;
import site.toeicdoit.api.board.model.BoardDto;
import site.toeicdoit.api.common.service.CommandService;
import site.toeicdoit.api.common.service.QueryService;


public interface BoardService extends CommandService<BoardDto>, QueryService<BoardDto> {
    default BoardModel dtoToEntity(BoardDto dto) {
        return BoardModel.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .build();
    }

    default BoardDto entityToDto(BoardModel entity){
        return BoardDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .regDate(entity.getRegDate().toString())
                .modDate(entity.getModDate().toString())
                .build();
    }
    
}
