import {BrowserRouter} from "react-router-dom";
import {Provider} from "mobx-react";
import AuthStore from "../../stores/AuthStore";
import LoginPage from "../LoginPage";
import NavBar from "../../components/common/nav";
import QuestionStore from "../../stores/QuestionStore";
import QuestionPage from "../QuestionPage";

<BrowserRouter>
      <Provider AuthStore={AuthStore}>
          <Switch>
              <Route exact path='/(login)' component={LoginPage}/>
              { (AuthStore.navbar) ? null : <NavBar /> }
          </Switch>
      </Provider>
      <Provider QuestionStore={QuestionStore}>
          <Switch>
              <Route path='/questions' component={QuestionPage}/>
          </Switch>
      </Provider>
  </BrowserRouter>