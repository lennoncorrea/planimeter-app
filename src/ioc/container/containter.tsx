import "reflect-metadata";
import { Container } from 'inversify';
import { HttpService } from '../interfaces/http.interface';
import { PlanimeterRequestService } from '../../pages/planimeter/requests/request.service';
import { ReactNode } from 'react';
import { Provider } from 'inversify-react';

const IoCContainer = ({ children }: { children: ReactNode }) => {
    const container = new Container();
    container.bind(HttpService.$).to(PlanimeterRequestService);
    return (
        <Provider container={() => {
            const container = new Container();
            container.bind(HttpService.$).to(PlanimeterRequestService);
            return container;
        }}>
            {children}
        </Provider>
    );
}
export default IoCContainer;