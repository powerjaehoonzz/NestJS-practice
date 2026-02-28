import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(CreateBoardDto: CreateBoardDto): Board {
    const { title, description } = CreateBoardDto;
    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return board;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
