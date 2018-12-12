import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

const context = () => {
    return ((typeof window !== 'undefined') && window) || ((typeof global !== 'undefined') && global) || this;
};

const Collection = new Map();

const loadServer = () => {
    return Collection.has('server') ? Collection.get('server') : undefined;
};

const saveServer = (component) => {
    Collection.set('server', component);
};

const loadStatic = () => {
    return Collection.has('static') ? Collection.get('static') : undefined;
};

const saveStatic = (component) => {
    Collection.set('static', component);
};

const loadBroswer = () => {
    return Collection.has('client') ? Collection.get('client') : undefined;
};

const saveBroswer = (component) => {
    Collection.set('client', component);
};

const isFunction = (component) => {
    if (!component.prototype) {
        return false;
    }
    return !component.prototype.isReactComponent;
};

const writeException = (e, serverSide = false) => {
    if (e.fileName) {
        console.error(`location: ${e.fileName}:${e.lineNumber}`);
    }
    console.error(`message: ${e.message}; stack: ${e.stack}`);
    if (serverSide) {
        const msgx = `Exception in rendering! ${e.fileName ? `\nlocation: ${e.fileName}:${e.lineNumber}` : ''} Message: ${e.message} ${e.stack}`;
        const reactElement = React.createElement('pre', null, msgx);
        return ReactDOMServer.renderToString(reactElement);
    }
    return undefined;
};

const listener = (context) => {
    const { document } = context;
    if (!document || context.__REACTIVE_EVENT_HANDLERS_RAN_ONCE__) {
        return;
    }

    context.__REACTIVE_EVENT_HANDLERS_RAN_ONCE__ = true;

    if (document.readyState === 'complete') {
        window.setTimeout(broswerInit);
    } else {
        document.addEventListener('DOMContentLoaded', broswerInit);
    }
};

const broswerInit = () => {
    const components = document.getElementsByClassName('reactive-component');

    if (components.length > 0) {
        for (let i = 0; i < components.length; i += 1) {
            const component = components[i];
            const dom_id = component.getAttribute('data-dom-id');
            const states = JSON.parse(component.textContent);

            try {
                const domNode = document.getElementById(dom_id);
                if (domNode) {
                    const contextEl = document.getElementById(`context-${dom_id}`);
                    const context = contextEl ? JSON.parse(contextEl.textContent) : null;

                    if (context.location && context.static) {
                        const componentObj = loadStatic();
                        const { concrete, executable } = componentObj;
                        if (executable) {
                            concrete(dom_id, context, states);
                        }
                    } else {
                        const componentObj = loadBroswer();
                        const { concrete, executable } = componentObj;
                        if (executable) {
                            concrete(dom_id, context, states);
                        }
                    }
                }
            } catch (e) {
                writeException(e);
                throw e;
            }
        }
    }
};


const dock = context();

dock.Reactive = {
    broswer(component) {
        if (!component) {
            throw new Error('Component should be valid object');
        }
        const executable = isFunction(component);
        saveBroswer({ concrete: component, executable });
    },
    server(component) {
        if (!component) {
            throw new Error('Component should be valid object');
        }
        const executable = isFunction(component);
        saveServer({ concrete: component, executable });
    },
    static(component) {
        if (!component) {
            throw new Error('Component should be valid object');
        }
        const executable = isFunction(component);
        saveStatic({ concrete: component, executable });
    },
    render(options) {
        const { states, context } = options;
        let html = '';
        try {
            const componentObj = loadServer();
            const { concrete, executable } = componentObj;

            if (executable) {
                html = concrete(context, states);
            } else {
                throw new Error('\Detected a renderer while server rendering component');
            }
        } catch (e) {
            html = writeException(e, true);
        }
        return JSON.stringify({
            html,
        });
    },
};

dock.Reactive;

listener(dock);

export default dock.Reactive;
