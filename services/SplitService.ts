import { getRepository } from "@/configurations/ormConfig"
import Split from "@/entities/Split"

export default {
    repository: await getRepository(Split),

    async saveSplit(split: Split) {
        await this.repository.save(split)
        return split
    },

    async deleteSplit(id: number) {
        this.repository.delete(id)
    },

}
