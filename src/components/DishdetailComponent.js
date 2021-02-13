import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import { List } from 'reactstrap'; 


    function RenderDish( { dish }){ 
        if (dish != null)
        return(
            <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
            </Card>
            );
            else
            return(
                <div></div>
                );
    }

    function RenderComments( {comments}){
        if (comments != null){
            const commentsCard = comments.map((comment) => {
                return (
                    <List type="unstyled" key={comment.id}> 
                        <li> { comment.comment }</li>
                        <li> --- { comment.author } - { Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date))) }</li>
                    </List> 
                )
            }); 

            return commentsCard;
        } else 
        return <div> </div>
        
    }


    const DishdetailComponent = (props) => {
        if (props.dish != null ){
            return (
                <div className="container"> 
                    <div className="row">   
                        <div className="col-12 col-md-5 m-1"> 
                            <RenderDish dish={props.dish} />
                        </div> 
                        <div className="col-12 col-md-5 m-1"> 
                            <RenderComments comments={props.dish.comments} />
                        </div> 
    
                    </div>
         </div>
        )
        } else {
            return null ;
        }
    }
    

        
    



export default DishdetailComponent;