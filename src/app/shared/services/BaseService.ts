// import { HttpParams } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Paginator } from "src/app/core/Paginator";
import { environment } from "src/environments/environment";

const baseUrl = environment.apiUrl;
export class BaseService {

    endPoint;

    constructor(controller: string) {
        this.endPoint = environment.apiUrl + "/" + controller;
    }

    protected serviceError(response: Response | any): any {
        let mensagemErro = '';

        if (response.error != null) {

            if (response.error.message) {
                mensagemErro = response.error.message;
            }

            if (response.error.errors) {
                mensagemErro = response.error.errors.join(',');
            }
        }
        if (response.status === 0) {
            mensagemErro = 'Erro ao se conectar à base de dados!';
        }

        if (response.status === 405) {
            mensagemErro = response.error ? response.error.error.message : 'Erro interno no servidor!';
            console.log(response);
        }

        if (response.status === 500) {
            mensagemErro = response.error ? response.error.error.message : 'Erro interno no servidor!';
            console.log(response);
        }

        throw mensagemErro;
    }

    extractData(response: any) {


        if (response) {
            if (response.data) {
                return response.data
            } else if (response.content) {
                return response.content
            } else {
                return response;
            }
        } else {
            return true;
        }

    }

    setPageToHttpParam(page: Paginator): HttpParams {
        var params = new HttpParams()
            .set('page', page ? page.pageIndex.toString() : '0')
            .set('size', page ? page.pageSize.toString() : '5')
        return params;
    }

}
