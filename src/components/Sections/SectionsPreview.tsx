import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/root.reducer";
import SectionPreview from "./Section/SectionPreview";

const mapStateToProps = (state: RootState) => ({
  sections: state.courseReducer.sections,
});

const connector = connect(mapStateToProps);

type SectionsProps = ConnectedProps<typeof connector>;

const SectionsPreview = ({ sections }: SectionsProps) => {
  return (
    <div>
    {
      sections.map((section, index) => {
        return (
          <SectionPreview
            last={index === sections.length - 1}
            key={section._id}
            section={section}
            index={index}
          />
        )
      })
    }
    </div>
  );
};

export default connector(SectionsPreview);
