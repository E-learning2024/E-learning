import { CreateAvaliationDTO } from "../dto/create-avaliation.dto";
import { AvaliationRepository } from "../repository/avalation.repository";

export class AvaliationService {
    constructor(private readonly avaliationRepository: AvaliationRepository,

    ) {
        console.log('avaliationRepository constructor - avaliationRepository:', this.avaliationRepository);
    }

    async create(createAvaliationDTO: CreateAvaliationDTO) {
        return await this.avaliationRepository.create(createAvaliationDTO)
    }
    async findAll() {
        return await this.avaliationRepository.findAll();
    }
    async findById(id: number) {
        return await this.avaliationRepository.findById(id);
    }
    async findByIdClass(id: number) {
        return await this.avaliationRepository.findByIdClass(id);
    }
    async update(id: number, data: CreateAvaliationDTO) {

        return await this.avaliationRepository.update(id, data);
    }
    async delete(id: number) {
        return await this.avaliationRepository.delete(id);
    }
}