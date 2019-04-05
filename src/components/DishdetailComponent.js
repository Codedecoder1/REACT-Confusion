import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


    /*componentDidMount() {
        console.log('Dishdetail component ComponentDidMount invoked');
    }*/
    /*componentDidUpdate() {
        console.log('Dishdetail component ComponentDidUpdate invoked');
    }*/
    function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
        
    }

    function RenderComments({comments}) {
        if (comments != null) {
            const list = comments.map(comment => {
                return (
                    <li key={comment.id}>
                        <div class="mb-3">{comment.comment}</div>
                        <div class="mb-3">--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                    </li>
                );
            })
            
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {list}
                    </ul>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    const  DishDetail = (props) => {

        console.log('Dishdetail component render invoked');

        if (props.dish != null) {
            return (
                <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments} />
                </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

export default DishDetail;