import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/root.reducer";
import Section from "./Section/Section";

const mapStateToProps = (state: RootState) => ({
  sections: state.courseReducer.sections,
});

const connector = connect(mapStateToProps);

type SectionsProps = ConnectedProps<typeof connector>;

const Sections = ({ sections }: SectionsProps) => {
  return (
    <div style={{ overflowY: 'scroll' }}>
    {
      sections.map((section, index) => (
        <Section last={index === sections.length - 1} key={section._id} index={index} section={section} />
      ))
    }
    </div>
  );
};

export default connector(Sections);
