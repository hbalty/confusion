import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardText, CardBody, BreadcrumbItem, Breadcrumb,  Col, Row, Label, ModalHeader, ModalBody, Modal, Button 
} from 'reactstrap';
import { List } from 'reactstrap'; 
import { LocalForm, Errors, Control } from 'react-redux-form'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);



    
    class CommentForm extends Component{

        constructor(props){
            super(props);
            this.state = {
                isModalOpen : false
            }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.toggleModal = this.toggleModal.bind(this)
        }

        handleSubmit(values){
            console.log(values, this.props.dishId)
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
            this.toggleModal()
        }

        toggleModal(){
            this.setState({ isModalOpen : !this.state.isModalOpen})
        }
    

        render(){
            return (
                    <div>
                        <Button onClick={this.toggleModal}>  Add comment </Button>
                        <Modal isOpen={this.state.isModalOpen}>
                        <ModalHeader> Submit Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)  }> 
                            <Row className="form-group">
                                <Label md={2}> Rating</Label>
                                <Col md={10}> 
                                    <Control.select
                                        className="form-control"
                                        name="rating"
                                        model=".rating"
                                        validators={
                                            { required }
                                        }
                                    > 
                                        <option selected> 1 </option>
                                        <option> 2 </option>
                                        <option> 3 </option>
                                        <option> 4 </option>
                                        <option> 5 </option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                        <Row className="form-group">

                            <Label md={2}> Author </Label>
                            <Col md={10}> 
                                <Control.text
                                    className="form-control"
                                    name="author"
                                    model=".author"
                                    placeholder="Author"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                >
                                </Control.text>
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
                            <Label md={2}> Comment </Label>
                            <Col md={10}> 
                                <Control.textarea
                                rows={6}
                                    className="form-control"
                                    name="comment"
                                    model=".comment"
                                >
                                </Control.textarea>
        
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 10, offset: 2}}>
                                <Button  type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </Col>
                        </Row>

                        </LocalForm>
                            
                        </ModalBody>
                    </Modal>
                </div> 
                
            )
        }

        
    }

    function RenderDish( { dish }){ 
        if (dish != null)
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
            </FadeTransform>
            );
            else
            return(
                <div></div>
                );
    }

    function RenderComments( {comments , postComment, dishId}){
        if (comments != null){
            
            const commentsCard = comments.map((comment) => {
                return (
                    <Fade in>
                        <List type="unstyled" key={comment.id}> 
                            <li> { comment.comment }</li>
                            <li> --- { comment.author } - { Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date))) }</li>
                            
                        </List>
                    </Fade>
                )
            }); 

            return <> 
                    <Stagger in>
                        {commentsCard}
                    </Stagger>
                    <CommentForm 
                        dishId={dishId}
                        postComment={postComment}
                    />  
                </>
        } else 
        return <div> </div>
        
    }


    const DishdetailComponent = (props) => {
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
        else if (props.dish != null){
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
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
                </div>
            );
        } else {
            return null ;
        }
    }
    

        
    



export default DishdetailComponent;