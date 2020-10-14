# Happy API
#### Scripts
- `dev`
- `typeorm`

#### Rotas disponíveis
- Criar orfanatos
  `[POST] /orphanages`
  - name
  - latitude
  - longitude
  - about
  - instructions
  - opening_hours
  - open_on_weekends
  - images

- Listar orfanatos
  `[GET] /orphanages`

- Buscar orfanato por id
  `[GET] /orphanages/:id`