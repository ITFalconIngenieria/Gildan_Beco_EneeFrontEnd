import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenereteCodeComponent } from './generete-code.component';

describe('GenereteCodeComponent', () => {
  let component: GenereteCodeComponent;
  let fixture: ComponentFixture<GenereteCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenereteCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenereteCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
