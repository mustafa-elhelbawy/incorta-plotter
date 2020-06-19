import React from 'react';
import { connect } from "react-redux";
import { getColumnsRequest } from "./store/actions/columns";
import './App.scss';
import Loader from "./components/loader/loader";

class App extends React.Component {
  componentDidMount() {
    this.props.getColumnsRequest();
  }

  render() {
    const { loader, columnsList } = this.props;
    return (
      <div className="App">
        {
          loader &&
          <Loader />
        }
        <div className="container-fluid">
          <div className="row">
            <aside className="col-4">
              <h1>Incorta plotter</h1>
              <ul>
                {
                  columnsList.map((col, i) => (
                    <li key={`column_${i}`} className="h4">
                      {col.name}
                    </li>
                  ))
                }
              </ul>
            </aside>
            <main className="col-8">
              <h2>Chart here to be displayed</h2>
            </main>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  loader: state.loader,
  columnsList: state.columns.list
});
const mapDispatchToProps = {
  getColumnsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
