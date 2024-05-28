import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import "./filter.css";

function SortingButton(props) {
    console.log(props);
    return (
        <div className="button-cover">
            <a className="button-info">{props.name}</a>
        </div>
    );
}

function SortingBar() {
    return (
        <div className="sorting-info">
            <div className="sorting-buttons">
                <ul>
                    <SortingButton name="All Contests" />
                    <SortingButton name="On Going" />
                    <SortingButton name="Completed" />
                    <SortingButton name="Cancelled" />
                </ul>
            </div>
        </div>
    );
}

export default SortingBar;
