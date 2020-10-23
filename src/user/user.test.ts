import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import { assert } from 'console';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/list (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/list')
      .query({ page: 1, pageSize: 10 })
      .expect(200)
      .expect(res => {
        assert(res.body.rows.length <= 10, true);
      });
  });
});
