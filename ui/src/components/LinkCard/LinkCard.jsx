import { Card, ActionButton, CardHeader } from "./LinkCard.styles.js";

function LinkCard() {
    return (
        <Card>
            <CardHeader>
                <ActionButton>Edit</ActionButton>
                <ActionButton>Delete</ActionButton>
            </CardHeader>
            <div className="card-body">

            </div>
        </Card>
    );
}

export default LinkCard;
