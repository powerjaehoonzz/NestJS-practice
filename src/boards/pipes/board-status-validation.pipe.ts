import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException(
        `Status must be a string. Received: ${typeof value}`,
      );
    }

    const status = value.toUpperCase();

    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`${status} isn't in the status options`);
    }

    return status;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
