import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';

describe('EduManage School ERP API Tests', () => {
  let adminToken: string;
  let parentToken: string;

  it('GET /health returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('POST /api/v1/auth/login authenticates Admin successfully', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@greenwood.edu.in',
        password: 'admin123',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe('ADMIN');
    adminToken = res.body.data.accessToken;
    expect(adminToken).toBeDefined();
  });

  it('POST /api/v1/auth/login authenticates Parent successfully', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'parent@greenwood.edu.in',
        password: 'parent123',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe('PARENT');
    expect(res.body.data.user.parent.children.length).toBeGreaterThan(0);
    parentToken = res.body.data.accessToken;
  });

  it('GET /api/v1/dashboard returns executive school statistics', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stats.totalStudents).toBeGreaterThan(0);
    expect(res.body.data.charts.monthlyAdmissions).toBeInstanceOf(Array);
  });

  it('POST /api/v1/admissions/enquiry records public enquiry with generated enquiry number', async () => {
    const res = await request(app)
      .post('/api/v1/admissions/enquiry')
      .send({
        studentName: 'Rhea Sengupta',
        dateOfBirth: '2016-03-22',
        gender: 'FEMALE',
        parentName: 'Debashis Sengupta',
        phone: '9810987654',
        email: 'debashis.sen@gmail.com',
        applyingClass: 'Class 5',
        message: 'Interested in day-boarding and music program.',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.enquiryNumber).toContain('ENQ-2026-');
    expect(res.body.data.status).toBe('NEW_ENQUIRY');
  });

  it('GET /api/v1/students returns active students list', async () => {
    const res = await request(app)
      .get('/api/v1/students')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].admissionNumber).toContain('GIA-2026-');
  });

  it('POST /api/v1/payments/razorpay-order generates order for valid invoice', async () => {
    const res = await request(app)
      .post('/api/v1/payments/razorpay-order')
      .set('Authorization', `Bearer ${parentToken}`)
      .send({
        invoiceId: 'inv-003',
        amount: 5000,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderId).toBeDefined();
    expect(res.body.data.amount).toBe(500000); // 5000 in paise
  });
});

