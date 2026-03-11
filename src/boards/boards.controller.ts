import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  async getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(CreateBoardDto);
  }

  @Get('/:id')
  async getBoardById(@Param('id') id: string): Promise<Board> {
    return this.boardsService.getBoardById(+id);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    await this.boardsService.deleteBoard(+id);
  }

  @Patch('/:id/status')
  async updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(+id, status);
  }
}
