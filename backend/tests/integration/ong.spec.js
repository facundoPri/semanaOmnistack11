const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be ablre to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "Test ONG2",
            email: "test@gmail.com",
            whatsapp: "1128254840",
            city: "Buenos Aires",
            uf: "AR"
        })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})