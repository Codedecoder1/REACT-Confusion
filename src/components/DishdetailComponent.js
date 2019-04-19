import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,  Button, Modal, ModalHeader, ModalBody,
     Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
    /*componentDidMount() {
        console.log('Dishdetail component ComponentDidMount invoked');
    }*/
    /*componentDidUpdate() {
        console.log('Dishdetail component ComponentDidUpdate invoked');
    }*/
    const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
//const isNumber = (val) => !isNaN(Number(val));
//const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
        
    }

    function RenderComments({comments, addComment, dishId}) {
        if (comments != null) {
            const list = comments.map(comment => {
                return (
                    <div class="container">
                    <div class="row">
                    <li key={comment.id}>
                        <div class="mb-3">{comment.comment}</div>
                        <div class="mb-3">--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                    </li>
                   </div>
                   </div>
                   
                    
                );
            })
            
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {list}
                    </ul>
                    <div class="row">
                    <CommentForm dishId={dishId} addComment={addComment} />
                   </div>
                    {/*<Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>*/}
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    const  DishDetail = (props) => {

        console.log('Dishdetail component render invoked');
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id}
                                                         />
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    class CommentForm extends React.Component{
        constructor(props){
            super(props);
            this.state= {
                isModalOpen: false
            }
            
    

            this.toggleModal = this.toggleModal.bind(this);
            this.handleComments = this.handleComments.bind(this);
          
  
        }
        
          toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

    
          handleComments(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
           // event.preventDefault();
    
        }
        

        render(){
            return(
                <React.Fragment>
                <div class="container">
                <Button outline onClick={this.toggleModal}><span className="fa fa-comment fa-lg"></span>Submit Comment</Button>
                </div>
                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={this.handleComments}>
                        <Row className="form-group">
                        <Col>
                        
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".ratings" name="ratings"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                <Col>
                                <Label htmlFor="firstname">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                     </Col>
                            </Row>
                                <Row className="form-group">
                                <Label htmlFor="message" md={2}>Comments</Label>
                                <Col>
                                    <Control.textarea model=".comment" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    </React.Fragment>
            );
        }

    }
    
export default DishDetail;