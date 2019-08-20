import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sistema Integrado ao Cora e a um Front End de Marcar Pontos e Cadastro de Funcionários';
  }
}
