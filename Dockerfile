FROM hasura/graphql-engine:v2.9.0
RUN rm -rf /srv/console-assets && rm -f /bin/graphql-engine
COPY /console/static/dist /srv/console-assets
# COPY /dist-newstyle/build/x86_64-linux/ghc-8.10.7/graphql-engine-1.0.0/x/graphql-engine/opt/build/graphql-engine/graphql-engine /bin/graphql-engine
COPY /dist-newstyle/build/x86_64-linux/ghc-8.10.7/graphql-engine-1.0.0/x/graphql-engine/noopt/build/graphql-engine/graphql-engine /bin/graphql-engine
RUN ls /bin/graphql-engine
CMD [ "graphql-engine", "serve" ]
# CMD [ "/bin/bash", "-c", "sleep 1000" ]