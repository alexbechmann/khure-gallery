import * as React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  StyleRulesCallback,
  withStyles,
  WithStyles,
  CardHeader,
  Avatar
} from 'material-ui';
import { paintingService } from './painting.service';
import { EntryCollection } from 'contentful';
import parseMarkdown from 'parse-markdown-js';

interface State {
  paintings?: EntryCollection<any>;
}

type ClassNames = 'card' | 'avatar';

interface Props extends WithStyles<ClassNames> {}

export const paintingsStyles: StyleRulesCallback<ClassNames> = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light
  }
});

class PaintingsComponent extends React.Component<Props, State> {
  state: State = {
    paintings: undefined
  };
  componentDidMount() {
    paintingService.getPaintings().then(paintings =>
      this.setState({
        paintings
      })
    );
  }
  render() {
    return (
      <div>
        {this.state.paintings ? (
          this.state.paintings.items.map(painting => {
            return (
              <Card key={painting.sys.id} className={this.props.classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={this.props.classes.avatar}>
                      H
                    </Avatar>
                  }
                  title={painting.fields.title}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  image={painting.fields.images[0].fields.file.url}
                  style={{
                    height: '250px'
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {painting.fields.title}
                  </Typography>
                  <Typography
                    component="p"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(painting.fields.description)
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary">
                    Contact for price
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <span />
        )}
      </div>
    );
  }
}

export const Paintings = withStyles(paintingsStyles, { withTheme: true })(PaintingsComponent);
