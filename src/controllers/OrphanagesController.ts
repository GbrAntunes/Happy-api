import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Ophanage'
import orphanageView from '../views/orphanages_view'

export default {
  async create(req: Request, resp: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body
    
    const orphanagesRepository = getRepository(Orphanage)
  
    // O Multer tem um problema de tipagem e o req.files não pode ser trabalhado como array
    // sendo assim, precisamos forçar a tipagem de um array de File
    const requestImages = req.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    })
  
    await orphanagesRepository.save(orphanage)
  
    return resp.status(201).json(orphanage)
  },

  async index(req: Request, resp: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return resp.json(orphanages)
  },
  
  async show(req: Request, resp: Response) {
    const { id } = req.params
    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return resp.json(orphanageView.render(orphanage))
  },
}