import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import { List } from 'reactstrap'; 

class DishdetailComponent extends Component {

    
    

    renderDish(dish){ 
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

    renderComments(dish){
        console.log(dish)
        if (dish != null){
            const comments = dish.comments.map((comment) => {
                return (
                    <List type="unstyled" key={comment.id}> 
                        <li> { comment.comment }</li>
                        <li> --- { comment.author } - { Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date))) }</li>
                    </List> 
                )
            }); 

            return comments;
        } else 
        return <div> </div>
        
    }
    
    render(){
        return (
            <div className="container"> 
                <div className="row">   
                    <div className="col-12 col-md-5 m-1"> { this.renderDish(this.props.dish)} </div> 
                    <div className="col-12 col-md-5 m-1"> 
                        { this.renderComments(this.props.dish)} 
                    </div> 

                </div>
            </div>
        )
    }
    
}


export default DishdetailComponent;