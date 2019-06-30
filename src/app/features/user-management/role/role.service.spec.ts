import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoleService } from './role.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

describe('RoleService', () => {
  let httpTestingController: HttpTestingController;
  let service: RoleService;
  let mockAppConfigService: any;
  beforeEach(() => {
    mockAppConfigService = jasmine.createSpyObj(['getUrl']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RoleService,
        { provide: AppConfigService, useValue: mockAppConfigService }
      ],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RoleService);
  });
  it(' RoleService should be created', () => {
    const roleService: RoleService = TestBed.get(RoleService);
    expect(roleService).toBeTruthy();
  });
});
