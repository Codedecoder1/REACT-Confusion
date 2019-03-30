import React ,{ Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';
import Menu from './MenuComponent';

class DishDetail extends Component {

  renderDish(dish) {
    if (dish != null)
        return(
          <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    else
        return(
            <div>

            </div>
        );
}
  render() {
    if (this.props.selectedDish != null)
    return(
  <div className="row">
      {this.renderDish(this.props.selectedDish)}
  </div>
    );
    else 
    return(
      <div class='row'>
 
      </div>
    );
  }
}
export default DishDetail;
