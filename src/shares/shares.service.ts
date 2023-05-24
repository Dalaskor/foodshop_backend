import { CreateShareDto, Share } from '@app/models';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SharesService {
  constructor(@InjectModel(Share) private shareRepository: typeof Share) {}
  /**
   * Создать акцию
   */
  async create(dto: CreateShareDto): Promise<Share> {
    const share = await this.shareRepository.create(dto);
    if (!share) {
      throw new BadRequestException('Ошибка создания акции');
    }
    return share;
  }
  /**
   * Получить все акции
   */
  async getAll(): Promise<Share[]> {
    const shares = await this.shareRepository.findAll();
    return shares;
  }
  /**
   * Получить акцию по ID
   */
  async getOne(id: number): Promise<Share> {
    const share = await this.shareRepository.findByPk(id);
    if (!share) {
      throw new NotFoundException('Акция не найдена');
    }
    return share;
  }
  /**
   * Удалить акцию
   */
  async delete(id: number): Promise<Share> {
    const share = await this.shareRepository.findByPk(id);
    if (!share) {
      throw new NotFoundException('Акция не найдена');
    }
    await share.destroy();
    return share;
  }
}
