# car-catalog

## Start local
```bash
  npm i
  npm run seed
  npm run start
```

### Open [localhost](http://localhost:3000/)
---
## Start with Docker
```bash
  docker compose build
  docker compose up -d
  docker compose down
```
### Migrate files
```bash
  docker exex -it CONTAINER_ID bash
  
```

```bash
  node ./scripts/importData.js ./data/import.json
```
### Open [localhost](http://localhost/)