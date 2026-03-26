import { getRepository } from "@/configurations/ormConfig"
import Movement from "@/entities/Movement"

export default {
    repository: await getRepository(Movement),

    async saveMovement(movement: Movement) {
        await this.repository.save(movement)
        return movement
    },

    async deleteMovement(id: number) {
        this.repository.delete(id)
    },

}
