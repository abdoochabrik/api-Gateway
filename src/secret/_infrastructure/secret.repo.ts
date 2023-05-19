import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../_core/_infrastructure/base.repo";
import { Repository } from "typeorm";
import { SecretEntity } from "./secret.entity";


@Injectable()
export class SecretRepository extends BaseRepository<SecretEntity> {

    constructor( @InjectRepository(SecretEntity)
    private readonly secretRepository: Repository<SecretEntity>){
        super(secretRepository)
    }

    public async createQueryBuilder() {
        return await this.secretRepository.createQueryBuilder("secret")
    }
 }