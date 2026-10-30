import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAutor } from './cadastro-autor';

describe('CadastroAutor', () => {
  let component: CadastroAutor;
  let fixture: ComponentFixture<CadastroAutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAutor],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroAutor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
