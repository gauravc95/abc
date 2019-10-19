FROM ubuntu:16.04

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68DB5E88
RUN apt-get update
RUN apt-get install -y software-properties-common apt-transport-https
RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb xenial stable"
RUN apt-get update
RUN apt install -y libindy=1.8.2 libsovtoken=0.9.7 libvcx=0.2.4

ENTRYPOINT ["/bin/bash"]
