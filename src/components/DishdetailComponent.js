import React ,{ Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

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

renderComments(comments) {
  if (comments != null)
  return ( 
    <div className="col-12 col-md-5 m-1">
    <div>
      <h1>Comments</h1>
      <ul class="list-unstyled"> 
        {comments.map((comment) => (
            <li key={comment.id}> 
            <div class="mb-3">{comment.comment} </div>
            <div class="mb-3"> {comment.author} {comment.date}</div>
            </li>
          )
        )}
      </ul>
    </div>

    </div>
  )
  else
    return (
    <div>

    </div>
  );
}
  render() {
    if (this.props.selectedDish != null)
    return(
  <div className="row">
      {this.renderDish(this.props.selectedDish)} 
     
     {this.renderComments(this.props.selectedDish.comments)}
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
