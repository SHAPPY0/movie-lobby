import { agent } from "supertest";
import app from '../src/server';
import { config } from "../src/utils/config";

const request = agent(app);

describe('Public Routes', () => {
    it('GET: /api/movies Should return success', async () => {
        const {body} = await request.get('/api/movies').expect(200)
        expect(body.success).toEqual(true)
    })
    // it('GET: /api/movies Should return empty list of movies', async () => {
    //     const {body} = await request.get('/api/movies').expect(200)
    //     expect(body.data?.length).toEqual(8)
    // })
    it('POST: /api/movies Should return Access Denied while adding movie', async () => {
        const {body} = await request.post('/api/movies').expect(403)
        expect(body.message).toEqual('Access Denied')
    })
    
})


describe('Privileged Routes', () => {
    let token = "";
    let movie_id = "";
    
    beforeAll(async () => {
        const { body } = await request.post('/api/user/login')
                            .send({
                                "username": config.user.username,
                                "password": config.user.password
                            })
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
        token = body.token;
      });

    it('POST: /api/movies Should add new movie', async () => {
        const {body} = await request.post('/api/movies')
                            .set('Authorization', `Bearer ${token}`)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
                            .send({
                                "title": "The Kashmir Files",
                                "thumbnail": "https://google.com",
                                "genre": ['drama'],
                                "streamLink": "https://google.com",
                                "rating": 5,
                                "releaseDate": "2023-02-11"
                            }).expect(200)
        movie_id = body.data?.movie_id;
        expect(body.success).toEqual(true)
        expect(body.message).toEqual("Movie added successfully");
    })

    it('PUT: /api/movies Should update the movie', async () => {
        const {body} = await request.put(`/api/movies/${movie_id}`)
                            .set('Authorization', `Bearer ${token}`)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
                            .send({
                                "genre": ['drama', "thriller"],
                                "rating": 8
                            }).expect(200)
        expect(body.success).toEqual(true)
        expect(body.message).toEqual("Movie updated successfully");
    })

    it('GET: /api/search Should search the movie by genre', async () => {
        const {body} = await request.get(`/api/search?q=drama`)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
                            .expect(200)
        expect(body.success).toEqual(true)
        expect(body.data.length).toBeGreaterThan(0);
    })

    it('GET: /api/search Should search the movie by title', async () => {
        const {body} = await request.get(`/api/search?q=the kashmir files`)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
                            .expect(200)
        expect(body.success).toEqual(true)
        expect(body.data.length).toBeGreaterThan(0);
    })
})