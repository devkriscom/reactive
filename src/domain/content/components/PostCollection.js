import './PostCollection.scss';
import React, { Component, Fragment } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import classNames from 'classnames';
import Pagination from '@atlaskit/pagination';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import ListIcon from '@atlaskit/icon/glyph/list';
import MediaServicesGridIcon from '@atlaskit/icon/glyph/media-services/grid';
import Form, { FormHeader, FormSection, FormFooter, Field, FieldGroup } from '@atlaskit/form';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import TextField from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import { RadioGroup } from '@atlaskit/radio';
import FieldTextArea from '@atlaskit/field-text-area';
import SearchIcon from '@atlaskit/icon/glyph/search';

type PageProps = {
    onChange: Function
}

type State = { }
export const PostPagination = ({pages = [1], onChange} : PageProps, { onChangeEvent: any }: State) => {
    return(
        <Fragment>
            <Pagination pages={pages} onChange={(event: SyntheticEvent<>, newPage: any) => onChange(event, newPage)} />
            </Fragment>
            )
}

type ToolProps = {
    edges: array,
    more: array
}

export const PostToolbar = ({edges = [], more = []} : ToolProps) => {
    return (
        <Fragment>
            <div className="post-collection-toolbar">
                <div className="view">
                    <MediaServicesGridIcon onClick={() => console.log('grid')} />
                    <ListIcon onClick={() => console.log('grid')} />
                </div>
                <div className="filter sort">
                    <Select
                        classNamePrefix="react-select"
                        options={[
                          { label: 'ASC', value: 'asc' },
                          { label: 'DESC', value: 'desc' }
                          ]}
                          placeholder="Sort"
                      />
                  </div>
              </div>
              </Fragment>
              );
}

type FilterProps = {
    edges: array,
    more: array
}
const resultBoxStyle = {
  width: '95%',
  height: '300px',
  borderStyle: 'dashed',
  borderWidth: '1px',
  borderColor: '#ccc',
  padding: '0.5em',
  color: '#ccc',
  margin: '0.5em',
};

type State = {
  eventResult: string,
};

const options = [
{ name: 'color', value: 'red', label: 'Red' },
{ name: 'color', value: 'blue', label: 'Blue' },
{ name: 'color', value: 'yellow', label: 'Yellow' },
{ name: 'color', value: 'green', label: 'Green' },
];
export const PostFilter = ({edges = [], more = []} : FilterProps) => {
    return (
        <Fragment>
            <div className="post-collection-filter">
                <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }} >
                    <Form>
                        <div style={{ display: 'flex', minWidth: '100%', flexDirection: 'row' }} >
                            <SearchIcon />
                            <TextField isLabelHidden={true} />
                        </div>

                        <Field
                            label="Select"
                            helperText="Helper Text"
                            invalidMessage="Field Invalid Message"
                            isInvalid
                            >
                            <Select />
                        </Field>

                        <Field
                            label="Field 1"
                            validMessage="Valid Message"
                            isInvalid={false}
                            >
                            <Select />
                        </Field>

                        <Field
                            label="Field 2"
                            invalidMessage="Invalid Message"
                            validMessage="valid Message"
                            isRequired
                            >
                            <Select />
                        </Field>

                        <FieldGroup label="Checkboxes">
                            <Field>
                                <Checkbox
                                    label="Checkbox- Valid"
                                    value="Valid"
                                    name="checkbox-valid"
                                />
                            </Field>
                            <Field isInvalid invalidMessage="Invalid Message">
                                <Checkbox
                                    label="Checkbox - Invalid"
                                    value="Invalid"
                                    name="checkbox-valid"
                                />
                            </Field>
                        </FieldGroup>

                        <Field isRequired label="Radio Group">
                            <RadioGroup options={options}  />
                        </Field>
                        
                        <FormFooter>
                            <Button type="submit" appearance="primary">
                                Search
                            </Button>
                            <Button appearance="subtle" >
                                Reset
                            </Button>
                        </FormFooter>
                    </Form>
                </div>
            </div>
            </Fragment>
            );
}


