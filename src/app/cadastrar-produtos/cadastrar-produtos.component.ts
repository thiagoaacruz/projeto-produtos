import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {

  //atributo
  mensagem: string = '';

  constructor(private httpCliente: HttpClient) { }

  ngOnInit(): void {
  }

  //estrutura do formulario
  formCadastro = new FormGroup ({
    //campos formulario
    nome: new FormControl('',[Validators.required]),
    preco: new FormControl('',[Validators.required]),
    quantidade: new FormControl('',[Validators.required]),
    descricao: new FormControl('',[Validators.required]),
  })

  //acessando o formulario/pagina HTML pegando dados tela
  get form():any{
    return this.formCadastro.controls;
  }

//fazer chamada de cadastro na API
onSubmit(): void{
  this.httpCliente.post(environment.apiUrl+'/produtos',
  this.formCadastro.value,{responseType: 'text'}).subscribe(
    data =>{
      this.mensagem = data;
      this.formCadastro.reset();
    },
    e => {
      this.mensagem = "Cadastro nao realizado";
      console.log(e);
    }
  )
}
}
