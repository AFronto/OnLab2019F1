import React, { Component } from 'react';
import { Text, List, Card, CardItem, Button} from "native-base";
import { ScrollView } from "react-native";
import commonStyles from '../../components/commonStyles';

export default class AllThreadView extends Component {
    constructor(props) {
        super(props);
        this.state={
            threads: []
        }
        
    }

    render() {
        console.log(this.state.threads)
        return (
            <ScrollView style={{ flex: 1 }}>
                <List style={{ marginTop: 10 }}>
                    {this.state.threads.map((question, index) => {
                        return (
                            <Card transparent style={commonStyles.commonWideButton}>
                                <CardItem style={{ backgroundColor:"#1a1d2e" }}>
                                    <Text style={commonStyles.commonText}> 
                                        {question.content}
                                    </Text>
                                </CardItem>
                                <CardItem header style={{ backgroundColor:"#1a1d2e", justifyContent:"flex-end" }}>
                                    <Button bordered >
                                        <Text style={commonStyles.commonText}>
                                            Read
                                        </Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        )
                    })
                    }
                </List>   
            </ScrollView>
        );
    }
}