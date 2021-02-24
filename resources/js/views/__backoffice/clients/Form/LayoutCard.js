import React, {useContext} from 'react';
import {
    Typography,
    CardContent,
    CardActionArea,
    CardMedia,
    withStyles,
    Card,
} from '@material-ui/core';

const styles = theme => ({
    card: {
        width: 345,
        marginTop: 40,
        marginBottom: 40,
      },
      media: {
        height: 140,
      },
});

function  LayoutCard(props) {
  const { classes, layout} = props;

  let styleCard = {
    background: layout.backgroundColor,
    color: layout.foregroundColor,
  };
  return (
    <Card className={classes.card} style={styleCard}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
         // image="https://klike.net/uploads/posts/2019-03/1551516106_1.jpg"
          image={`${layout.path}/strip.png`}
          title="Contemplative Reptile"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {layout.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
               {Lang.get(`content.wallet.${layout.type}`)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {Lang.get('content.created_at')}:  {layout.created_at}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(LayoutCard)